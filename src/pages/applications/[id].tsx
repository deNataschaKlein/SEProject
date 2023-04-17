function ApplicantDetail() {
  /*const router = useRouter();
  const { id } = router.query;

  const [applicant, setApplicant] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  async function getApplicant() {
    let { data: applications } = await supabase
      .from("applications")
      .select("firstname, name,status")
      .eq("id", id);

    setApplicant(applications);
  }

  async function getStatus() {
    let { data: applicationstatus } = await supabase
      .from("applicationstatus")
      .select("*")
      .eq("id", applicant[0].status);

    setStatus(applicationstatus);
  }

  useEffect(() => {
    getStatus();
    if (id) {
      getApplicant();
    }
    if (applicant) {
      getStatus();
    }
  }, [id]);*/

  return (
    <>
      {/*{applicant && (
        <div>
          <h1>
            Hallo {applicant[0].firstname} {applicant[0].name}
          </h1>
          <p>Deine Bewerbung ist {status[0].name} .</p>

          <Button onClick={() => getApplicant()}>Status erneut abfragen</Button>
        </div>
      )}*/}
    </>
  );
}

export default ApplicantDetail;
