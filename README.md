# ilmo
Fyysikkokillan ilmomasiina

## Starting up
```shell
$ docker-compose build
$ docker-compose up
```

## Test events
```javascript
r.db('ilmo').table('events').insert({
  name: 'Testi',
  fields: [{
    key: r.uuid(),
    label: 'Etunimi',
    type: 'text',
    optional: false,
    public: true
  }]
})

r.db('ilmo').table('events').insert({
  name: 'Laajempi testi',
  fields: [{
    key: r.uuid(),
    label: 'Etunimi',
    type: 'text',
    optional: false,
    public: true
  }, {
    key: r.uuid(),
    label: 'Sukunimi',
    type: 'text',
    optional: false,
    public: true
  }, {
    key: r.uuid(),
    label: 'Sukupuoli',
    type: 'radio',
    choices: ['Mies', 'Nainen', 'En tiedä'],
    optional: true,
    public: true
  }, {
    key: r.uuid(),
    label: 'Paikkakunta',
    type: 'select',
    choices: ['Helsinki', 'Muu'],
    optional: true,
    public: false
  }]
})
```
