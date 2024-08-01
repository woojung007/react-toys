import { useEffect, useState } from "react";

// DeviceMotionEvent 타입 확장
interface DeviceMotionEventWithPermission extends DeviceMotionEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

interface MotionData {
  acceleration: DeviceMotionEvent["acceleration"] | null;
  accelerationIncludingGravity:
    | DeviceMotionEvent["accelerationIncludingGravity"]
    | null;
  rotationRate: DeviceMotionEvent["rotationRate"] | null;
  interval: number | null;
}

interface OrientationData {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export default function MotionPermission() {
  const [motionData, setMotionData] = useState<MotionData | null>(null);
  const [orientationData, setOrientationData] =
    useState<OrientationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleMotion = (event: DeviceMotionEvent) => {
    console.log(event);

    setMotionData({ ...event });
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    console.log(event);

    setOrientationData({ ...event });
  };

  interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<"granted" | "denied">;
  }

  const requestPermission = (
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  ).requestPermission;
  const iOS = typeof requestPermission === "function";

  const onClickRequestPermission = async () => {
    console.log("ios", iOS);

    setError(String(iOS));

    if (iOS) {
      const response = await requestPermission();

      setResponse(response);

      if (response === "granted") {
        // execute
        console.log(response);
      }
    }

    window.addEventListener("devicemotion", handleMotion, true);
    window.addEventListener("deviceorientation", handleOrientation, true);
  };

  // @ts-nocheck

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <button onClick={onClickRequestPermission} className="w-40 h-10">
        모션 권한 요청!
      </button>

      <div>
        <h1>기기 모션 권한 요청</h1>
        {error && <p>{error}</p>}
        {response && <p>{JSON.stringify(response, null, 2)}</p>}
        {motionData && (
          <div>
            <h2>Motion Data:</h2>
            <pre>{JSON.stringify(motionData, null, 2)}</pre>
          </div>
        )}
        {orientationData && (
          <div>
            <h2>Orientation Data:</h2>
            <pre>{JSON.stringify(orientationData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
