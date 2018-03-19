# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


paulo = User.new ({
    name: 'Paulo Henrique Pieczarka da Silva',
    email: 'paulopieczarka@gmail.com',
    passwd: 'paulo123'
})
paulo.save
alexandre = User.new ({
    name: 'Alexandre Gueths',
    email: 'agueths@gmail.com',
    passwd: 'alexandre123'
})
alexandre.save

notebook = Product.new ({
    name: 'Notebook Dell 1770',
    price: 3000.00,
    description: 'Notebook bonzão',
    user: paulo,
    imgbase: 'data:image/jpeg;base64,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'
})
notebook.save

commentary = Comment.new ({
    user: alexandre,
    product: notebook,
    text: 'Nossa, que notebook bonzão, eu quero.'
})
commentary.save

commentary2 = Comment.new ({
    user: paulo,
    parent: commentary,
    text: 'Compra então, vagabundo'
})
commentary2.save