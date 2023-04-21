import BoxBase from "@/components/BoxBase";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

export default function EvaluationCheck(props: any) {
  const [evaluation, setEvaluation] = useState<any | undefined>();
  const [rate, setRate] = useState<number>();

  useEffect(() => {
    setEvaluation(props.evaluation);
    setRate(props.rate);
  }, [props]);

  return (
    <>
      <BoxBase>
        <h4>{props.name} </h4>
        {evaluation && (
          <div>
            <Slider disabled defaultValue={rate} max={5} />
            <Slider max={5} />
          </div>
        )}
      </BoxBase>
    </>
  );
}
