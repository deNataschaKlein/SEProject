import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import styles from "./account.module.css";
import Avatar from "./Avatar";

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }: any) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={styles.accountInput}>
        {/*<label htmlFor="email">Email</label>*/}
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className={styles.accountInput}>
        {/*<label htmlFor="username">Username</label>*/}
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.accountInput}>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div className={styles.accountInput}>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Ausloggen
        </button>
      </div>
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={40}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, avatar_url: url });
        }}
      />
    </div>
  );
}
