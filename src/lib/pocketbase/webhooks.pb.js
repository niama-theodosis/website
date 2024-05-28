onRecordAfterUpdateRequest(({collection, record}) => {
  const devUrl = $os.getenv("WEBHOOK_DEV_URL")
  const prodUrl = $os.getenv("WEBHOOK_PROD_URL")

  const tags = [collection.name]
  if (collection.name === "services") tags.push(`${collection.name}_${record.slug}`)

  const sendWebhook = (url) => {
    try {
      $http.send({
        url,
        method: "POST",
        body: JSON.stringify({tags}),
        headers: {"content-type": "application/json"},
      })
    } catch (error) {
      console.error(`Webhook - ${collection.name} - ${record.id} - ${url} : ${error.message}`)
    }
  }

  if (prodUrl) sendWebhook(prodUrl)
  if (devUrl) sendWebhook(devUrl)
})
