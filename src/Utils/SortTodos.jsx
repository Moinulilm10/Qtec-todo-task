const SortBar = ({ onSort }) => {
  const handleSortChange = (event) => {
    const selectedOptions = event.target.value;
    onSort(selectedOptions);
  };

  return (
    <>
      {" "}
      <div className="flex items-stretch space-x-3 ">
        <select
          className="cursor-pointer rounded-md  px-4 py-2 text-center text-[#fff] bg-purple-500 hover:bg-purple-400 shadow-lg"
          name="sortBy"
          id="sortBy"
          onChange={handleSortChange}
        >
          <option value="">Sort</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
    </>
  );
};

export default SortBar;
