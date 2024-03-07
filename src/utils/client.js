import {createClient} from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "34l7ffkt",
    dataset: "production",
    apiVersion: "2023-03-07",
    useCdn: true,
    token: "sk83M9BGvzXiX0VZtibuaN4oMX4wObvnV1BTHgYQOEfWh6ljJR0DiLdPrwdEsjumY1ZFMUoXYvk2WlDB2BIJwqsFESyD1z6ZYJkVWoBBDJZCjoZRC869dm9cNFidULMyrqnvJ8OMZ6CMZiO3FEP23rJixvu4e64p7WZu7g3s0e4b0L56GYfY",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);