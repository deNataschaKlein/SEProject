import { useEffect, useState } from "react";

export default function FormApplicationManager(props: any) {
  const [applicant, setApplicant] = useState(undefined);

  useEffect(() => {
    setApplicant(props.applications);
  }, [props.applications]);

  return (
    <>
      {applicant && (
        <form>
          <h1> {applicant.firstname}</h1>
        </form>
      )}
    </>
  );
}
