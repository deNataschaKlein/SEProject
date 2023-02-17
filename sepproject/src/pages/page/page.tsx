import { supabase } from '../../../lib/supabaseClient'

function Page({ study_programs }) {
    return (
        <ul>
            {study_programs.map((studyprogram) => (
                <li key={studyprogram.id}>{studyprogram.name}</li>
            ))}
        </ul>
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

export default Page;