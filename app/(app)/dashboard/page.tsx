import Image from "next/image";

async function Page() {
  const response = await fetch("https://zenquotes.io/api/random");

  if(!response.ok) throw new Error("Process failed");

  const albums = await response.json();
  console.log(albums)
  return (
<div>
  <h2 className="text-center font-bold text-red">
    {/* Add return statement with JSX */}
    {albums.map((album) => (
      // Wrap 'album?.q' in JSX to display it
      <span className="text-center font-bold text-white" key={album.id || Math.random().toString(36)}>Quote :: {album?.q}
      Author :: {album?.a}
      </span>
    ))}
  </h2>
</div>
  )
}

export default Page