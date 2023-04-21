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
        {props.name}
        {evaluation && <Slider disabled defaultValue={rate} max={5} />}
      </BoxBase>
    </>
  );
}
