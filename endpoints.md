GET /user/:userid returns:
{
	"user": {
		"_id": "664db5ae509cc0afb30cc382",
		"full_name": "Alex Johnson",
		"email": "alex.johnson@example.com",
		"password": "P@ssw0rd123",
		"bookmarks": [],
		"progress": [
			{
				"lesson1": true
			},
			{
				"lesson2": false
			},
			{
				"lesson3": true
			},
			{
				"lesson4": false
			}
		]
	}
}
GET /forums/:postid returns:
{
	"post": {
		"_id": "664db460509cc0afb30cc376",
		"title": "Best Toys for Baby's Development",
		"body": "What are some of the best toys for supporting my baby's development?",
		"author": "toylovingmom",
		"votes": 22,
		"date": "2024-05-05T10:00:00.000Z",
		"comments": [
			{
				"_id": "664db4d5509cc0afb30cc37e",
				"author": "earlyeducator",
				"body": "Simple toys like stacking blocks and shape sorters are great for motor skills.",
				"votes": 14,
				"date": "2024-05-05T11:00:00.000Z"
			},
			{
				"_id": "664db4d6509cc0afb30cc37f",
				"author": "toyenthusiast",
				"body": "Soft books with different textures can engage their senses.",
				"votes": 11,
				"date": "2024-05-05T12:00:00.000Z"
			}
		]
	}
}

GET /flashcards/:unitnumber returns:
{
	"flashcards": [
		{
			"_id": "664db209509cc0afb30cc36f",
			"unit": 2,
			"section": "2-4 months",
			"title": "Setting Boundaries",
			"body": [
				"Clear and consistent boundaries help children understand expectations and consequences.",
				"Be firm but fair, and explain the reasons behind the rules.",
				"Consistent enforcement of boundaries is crucial for effectiveness."
			],
			"img_url": "https://images.pexels.com/photos/1684038/pexels-photo-1684038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
		}
	]
}
GET /forums/:postid/comments/:commentid returns:
{
	"comment": {
		"_id": "664db4d5509cc0afb30cc37e",
		"author": "earlyeducator",
		"body": "Simple toys like stacking blocks and shape sorters are great for motor skills.",
		"votes": 14,
		"date": "2024-05-05T11:00:00.000Z"
	}
}
PATCH /forums/:postid &&
PATCH /forums/:postid/comments/:commentid &&
PATCH /articles/:articleid 
Take request object format: 
{inc_votes: (number)}

PATCH /users/:userid 
Takes request object format: 
{_id: (number), type: (string)} type string MUST be either 'articles' or 'forums

POST /forums
Takes request object format: 
{title: (string), body: (string), author: (string)}

POST /forums/:postid/comments
Takes request object format: 
{body: (string), author: (string)}