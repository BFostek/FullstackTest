import { MongoClient } from "mongodb"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const client = new MongoClient(process.env.MONGO_URI!, {})
  await client.connect();
  const searchParams = request.nextUrl.searchParams;
  const cityName = searchParams.get("city");
  const cities = await client.db("location").collection("cities").aggregate(
    [
      {
        $search: {
          index: "default",
          compound: {
            must: [
              {
                text: {
                  query: cityName,
                  path: "searchName",
                  fuzzy: {
                    maxEdits: 1,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          searchName: 1,
          _id: 1,
          city: 1,
          country: 1,
          adminCode: 1,
          countryCode: 1,
          fullName: 1,
          latitude: 1,
          longitude: 1,
          score: { $meta: "searchScore" },
        },
      },
      {
        $limit: 10,
      },
    ]).toArray()
  await client.close();

  return Response.json(cities)
}
