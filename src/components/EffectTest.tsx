import { useEffect, useState } from "react";

function EffectTest() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Component loaded");
  }, []);

  return (
    <div>
      <h2>Users Effect</h2>
    </div>
  );
}

export default EffectTest;