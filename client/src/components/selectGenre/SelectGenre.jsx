import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../../redux/features/moviesSlice";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  return (
    <select
      onChange={e => {
        dispatch(fetchDataByGenre({ genre: e.target.value, type }));
      }}
    >
      {genres.map(genre => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectGenre;
