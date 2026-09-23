// src/hooks/useUsersPage.ts
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { User } from "../types/user";

interface UsersPageResponse {
  page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export function useUsersPage(page: number) {
  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    apiClient
      .get<UsersPageResponse>(`/users?page=${page}`)
      .then((res) => {
        if (cancelled) return;
        setData(res.data.data);
        setTotal(res.data.total);
        setTotalPages(res.data.total_pages);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load users");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  return { data, total, totalPages, loading, error };
}