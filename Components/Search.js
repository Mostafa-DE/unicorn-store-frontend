import useSearch from "@/Hooks/useSearch";

export default function Search() {
  const [searchTerm, handleChange] = useSearch("");
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        style={{ margin: "10rem 0 0 0" }}
      />
    </div>
  );
}
