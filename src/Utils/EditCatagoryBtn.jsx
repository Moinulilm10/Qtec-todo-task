import { useEffect, useState } from "react";

const EditCatagoryBtn = ({ val, selectedCatagory, handleSelected }) => {
  const [activeCatagory, setActiveCatagory] = useState(false);

  useEffect(() => {
    const isSelected = selectedCatagory.some(
      (v) => v.catagory === val.catagory
    );
    setActiveCatagory(isSelected);
  });

  return (
    <div>
      <ul>
        <li
          onClick={() => {
            handleSelected({
              id: val.id,
              catagory: val.catagory,
              emoji: val.emoji,
            });
          }}
          className={`text-base cursor-pointer flex items-center gap-2 font-medium text-white rounded-lg px-4 py-2  ${
            activeCatagory
              ? "bg-purple-600 border-purple-300 border-2"
              : "bg-purple-400"
          } `}
        >
          <span className=" text-2xl max-sm:text-xl">{val.emoji}</span>
          {val.catagory}
        </li>
      </ul>
    </div>
  );
};

export default EditCatagoryBtn;
