const getClientIp = (req) => {
  const xForwordedFor = req.headers["x-forworded-for"];

  let ip = xForwordedFor
    ? xForwordedFor.split(",")[0].trim()
    : req.connection.remoteAddress || req.socket.remoteAddress;

  // Check if the IP is an IPv6-mapped IPv4 address
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }
  return ip;
};

module.exports = { getClientIp };
