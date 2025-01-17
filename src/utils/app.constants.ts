// URL TO VERIFY USER DATA TO LOGIN
export const signin_user_url = "https://test-api-y04b.onrender.com/signIn";

// URL LIST ALL MARKS OF CARS
export const list_mark_cars = "https://parallelum.com.br/fipe/api/v1/carros/marcas";

// URL LIST ALL MODELS OF ONE MARK OF CAR
export const list_model_cars = (mark: string) => {
  const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${mark}/modelos`;
  return url
}