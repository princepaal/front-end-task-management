import React, { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

interface WithDimensionsProps {
  width: number;
  height: number;
}

const withDimensions = <P extends WithDimensionsProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, keyof WithDimensionsProps>) => {
    const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get("window"));

    useEffect(() => {
      const updateDimensions = ({ window }: { window: ScaledSize }) => {
        setDimensions(window);
      };

      const subscription = Dimensions.addEventListener("change", updateDimensions);

      return () => {
        subscription.remove();
      };
    }, []);

    return <WrappedComponent {...(props as P)} width={dimensions.width} height={dimensions.height} />;
  };
};

export default withDimensions;
