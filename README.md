# Librería de Transacciones

Librería para la solicitud de transacciones con la API del Banco en el grupo S8A de la materia DDSSC (Desarrollo y Diseño de Sistemas de Software Complejos).

# Instalación

```
npm install --save https://github.com/ger88555/transacciones.git
```

# Uso

Comunicarse con la API del banco consiste en utilizar números de tarjeta para identificarse. En esta librería, al número de tarjeta se le considera `cuenta`.

Por ejemplo, si nuestro número de tarjeta bancaria es '111111111111', y la de otro cliente es '2222222222222222':

```javascript
const Transacciones = require('transacciones')


/// Definir la cuenta bancaria:

// Como constructor
Transacciones({ cuenta: '111111111111' })

// o como setter
Transacciones().setCuenta('111111111111')


/// Solicitar una transacción:

// Recibir dinero de otro cliente
Transacciones().recibir('2222222222222222', 5000.00)

// Enviar dinero a otro cliente
Transacciones().enviar('2222222222222222', 5000.00)


/// Si queremos especificar manualmente la URL del banco:
Transacciones().setURL('banco.net:8080') // incluir el puerto si no es 80

```

*La URL del banco ya está definida, pero si está sujeta a cambios, es recomendable cambiarla.

*En caso de éxito en una solicitud, se retornan los datos de la transacción generada.

# Excepciones

```javascript
const { BancoAPIException } = require('transacciones')
```

En caso de error (incluyendo cuando la API retorna status 200 y una cadena como respuesta), esta librería arroja una excepción de tipo `BancoAPIException`, que tambien se exporta de este módulo.

Si hubo un error pero la comunicación con la API fue exitosa, el mensaje de `BancoAPIException` tendrá el mensaje devuelto por el banco. De lo contrario, el mensaje de error es: `'Hubo un error al contactar a la API del banco.'`
