/** 
 * Get restaurants from Google Maps API
 * @param currentDestination - The current destination
 * @returns The restaurants
 */
export const getRestaurants = async (currentDestination: any) => {
  try {
    const response1 = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${currentDestination}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );
    const data1 = await response1.json();
    if (data1) {
      // Use absolute URL for server component
      const response = await fetch(
        `/api/restaurants?lat=${data1?.results[0]?.geometry?.location?.lat}&lng=${data1?.results[0]?.geometry?.location?.lng}`
      );
      const data = await response.json();
      return data?.results?.slice(0, 10) || [];
    } else {
      return [];
    }
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    return [];
  }
};
