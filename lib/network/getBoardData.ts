export default async function getBoardData() {
  const res = await fetch("/api/ai/generate-project-board", {
    method: "POST",
    body: JSON.stringify({
      projectDescription:
        "I want to build a todo app. I want to use Jetpack Compose, Room, and Dagger Hilt. I want my app to be a single user app, no authentication. I want user's to be able to view todo list, and filter list by the fields for priority and tags. Tags is a list of string, and users should be able to select multiple tags when filtering todos. The user should be able to mark todo's complete from the list, and be able to batch delete completed todo's. They should also be able to delete any completed todo's by swiping right on that todo as well. It should only be one screen, and adding and editing todo's should happen inside alert dialog modals.\\n\\n\\n",
    }),
  })
  console.log("Response: ", res)
  return res.json()
}
