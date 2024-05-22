const { Url } = require("../models/url");

// const { nanoid } = require("nanoid");
/*
NOTE: The error you are encountering is due to nanoid being an ES Module, 
      and it cannot be imported using require(). Instead, you need to use dynamic import() 
      or convert your project to use ES Modules if it isn't already.
*/
async function handleGetShortUrl(req, resp) {
  const body = req.body;
  if (!body.url) resp.status(400).json("Url required..");

  const { nanoid } = await import("nanoid");
  const id = nanoid(8);

  await Url.create({
    shortId: id,
    redirectUrl: body.url,
    visitHistory: [],
  });

  resp.status(201).json({ message: "Success", shortId: id });
}

async function handleRedirectUrl(req, resp) {
  const shortId = req.params.shortID;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log({ entry });

  resp.status(200).redirect(entry.redirectUrl);
}
module.exports = {
  handleGetShortUrl,
  handleRedirectUrl,
};
