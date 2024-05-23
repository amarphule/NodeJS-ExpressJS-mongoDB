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

async function handleHistory(req, resp) {
  const shortId = req.params.shortID;
  const result = await Url.findOne({ shortId });
  resp.status(200).json({
    visitedCount: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleGetAllurl(req, resp) {
  const urls = await Url.find({});
  resp.render("Home", { urls });
}

module.exports = {
  handleGetShortUrl,
  handleRedirectUrl,
  handleHistory,
  handleGetAllurl,
};
