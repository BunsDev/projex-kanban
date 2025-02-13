import { createClient } from "@/utils/supabase/server";

/*
    This will select all the rows from the instruments table in Supabase and render them on the page.
    This is a good example of how to use the createClient function to get data from Supabase.
    https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
*/
export default async function Instruments() {
	const supabase = await createClient();
	const { data: instruments } = await supabase.from("instruments").select();

	return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}
