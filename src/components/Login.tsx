import Account from "@/components/Account";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <Auth providers={[]} supabaseClient={supabase} />
      ) : (
        <Account session={session} />
      )}
    </>
  );
}
