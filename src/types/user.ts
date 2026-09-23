export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface SupportInfo {
  url: string;
  text: string;
}

export interface ExternalAddress {
  street: string;
  suite: string;
  city: string;
  zipcode?: string;
}

export interface ExternalUser {
  id: number;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: ExternalAddress;
  company?: {
    name: string;
  };
}
