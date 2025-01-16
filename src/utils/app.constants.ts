// VERIFY USER DATA TO LOGIN
const signin_user_url = "https://test-api-y04b.onrender.com/signIn";
// LIST ALL MARKS OF CARS
const list_mark_cars = "https://parallelum.com.br/fipe/api/v1/carros/marcas";
// LIST ALL MODELS OF ONE MARK OF CAR
const list_model_cars = (mark: string) => {
  const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${mark}/modelos`;
  return url
}