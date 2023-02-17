import {supabase} from "../../../lib/supabaseClient";
import {useEffect, useState} from "react";

function studyPrograms() {
    const [programs, setPrograms] = useState<any[]>([])

    async function getStudyPrograms(){
        let { data: study_programs, error } = await supabase
            .from('study_programs')
            .select('*')
        setPrograms(study_programs)
    }

    useEffect(() => {getStudyPrograms()}, [])
    if(programs) {
        return (
            <>
                <div> Hello World</div>
                <ul>
                    {programs.map((program) => (
                        <li key={program.id}>{program.name}</li>
                    ))}
                </ul>
            </>
        );
    }

}

export async function getServerSideProps() {
    let { data } = await supabase.from('study_programs').select()

    return {
        props: {
            study_programs: data
        },
    }
}

export default studyPrograms;