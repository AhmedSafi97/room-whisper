const validator = async ({ schema, data }) => {
  const result = { isValid: true, error: '' }

  try {
    await schema.validate(data, { abortEarly: true })
  } catch (error) {
    result.isValid = false
    result.error = error.errors[0]
  }

  return result
}

export default validator
