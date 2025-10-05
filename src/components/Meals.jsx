import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error"

//auto to dimiourgoume edo, gt ean to dimiourgoysame mesa sto component tha etrexe 
//kathe fora kai kathe fora tha dimiourgoyntan neo object kai tha xanaetrexe to useHttp
const requestConfig = {}

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading){
    return <p className="center">Fetching Meals...</p>
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />

  }
  
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
