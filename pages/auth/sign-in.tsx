import PrimaryLayout from "@/components/layout/PrimaryLayout";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import supabase from "../../lib/supabase";
import { NextPageWithLayout } from "../page";

const SignIn: NextPageWithLayout = () => {
  return (
    <>
      <PrimaryLayout>
        <main className="bg-gray-200 h-full overflow-y-scroll">
          <h1>Sign In Page</h1>
          {/* <div className="m-4 p-2">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </div> */}
        </main>
      </PrimaryLayout>
    </>
  );
};

export default SignIn;
