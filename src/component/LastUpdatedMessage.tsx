import React, {useEffect, useState} from "react";

export function LastUpdatedMessage({lastUpdatedInit}: {
  lastUpdatedInit: number;
}) {
  const [timeElapse, setTimeElapse] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapse(timeElapse + 60000);
    }, 60000);
    return () => clearInterval(interval);
  });
  if (lastUpdatedInit < 0) return <></>;
  const minutes = Math.floor((timeElapse + lastUpdatedInit) / 60000).toFixed(0);
  return <p>Last updated: {minutes} minute{minutes === '1' ? "" : "s"} ago.</p>
}
