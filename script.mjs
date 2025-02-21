

const x = 'firstname:varchar(32),lastname:varchar(32),email:varchar(64),created_at:datetime'.split(',').map(s =>
{
    let v = s.split(':')
    return {
        name: v[0],
        value: v[1]
    }
})


console.log(x)