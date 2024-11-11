export const personalDataRules = {
  name: { min: 2, max: 200 }
}

export const namePattern = new RegExp('^[üúíéóáa-zA-ZÁÉÍÓÚÜ ]+$')