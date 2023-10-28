import { useRef, useState } from "react";
import { initialStats } from "../utils/stats";

export const useStats = () => {
  const tempLines = useRef(0);
  const [stats, setStats] = useState(() => initialStats());
  return { stats, setStats, tempLines };
};
