import { supabase } from '../../lib/supabaseClient'
import StudyPrograms from "@/pages/studyPrograms/studyPrograms";

function Home() {
  return (
      <>
        <StudyPrograms/>
      </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from('study_programs').select()

  return {
    props: {
      study_programs: data
    },
  }
}

export default Home;