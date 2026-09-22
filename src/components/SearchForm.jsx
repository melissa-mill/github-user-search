function SearchForm({ loading, searchTerm, setSearchTerm, handleSubmit }) {
  return (
    <form
      id="search-form"
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-4/5 md:w-3/5 m-auto mb-4 bg-[#f6f8fa] dark:bg-gray-700 rounded-lg p-2"
    >
      <input
        id="search-input"
        name="search-input"
        type="text"
        placeholder="Search GitHub username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full focus-visible:bg-transparent "
      />
      <button
        disabled={!searchTerm || loading}
        type="submit"
        className="search-btn w-24 text-sm text-white font-semibold bg-sky-500 p-2 rounded-lg hover:bg-sky-600 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
