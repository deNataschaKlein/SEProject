import { useEffect} from "react";
import { supabase } from "../../lib/supabaseClient";
import StudyPrograms from "@/pages/studyPrograms/studyPrograms";


function Filter() {

  let Degree: number;


  //https://supabase.com/docs/guides/database/functions

  const getFilteredPrograms = async () => {
    let { data } = await supabase
      .from("StudyPrograms")
      .select("name")
      .eq("id", Degree)
//    .or("place", place);

    setPrograms(data);
  };

  useEffect(() => {
    getFilteredPrograms();
  }, [getFilteredPrograms]);

  /*
  if (getFilteredPrograms()) {
    return (
      <>
        <button onClick={(Degree = 1)}> Bachelr </button>
        <button onClick={(Degree = 2)}> Master </button>
        <button onClick={(Degree = 3)}> Promotion </button>

        <button onClick={(studyType = 1)}>  dual </button>
        <button onClick={(studyType = 2)}> berufsbegleitend </button>
        <button onClick={(studyType = 3)}> vollzeit </button>
        <button onClick={(studyType = 4)}> verkürzt </button>

        
        <button onClick={(place = 1)}> Paderborn </button>
        <button onClick={(place = 2)}> Bielefeld </button>
        <button onClick={(place = 3)}> Mettman </button>
        <button onClick={(place = 4)}> Bergisch Gladbach </button>
        <button onClick={(place = 5)}> Marburg </button>

      </>
    );
  }
  */
}

export default Filter;