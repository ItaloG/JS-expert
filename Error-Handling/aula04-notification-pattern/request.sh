echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}' #correct!

echo $'\n\n[requesting: invalid age]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "18"}'

echo $'\n\n[requesting: invalid name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": "80"}'

echo $'\n\n[requesting: all invalid]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": "0"}'

echo $'\n\n[requesting: connectionError]'
curl -i localhost:3000 -X POST --data '{"connectionError": "error"}'