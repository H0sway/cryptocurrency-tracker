SELECT * FROM users
JOIN currencies
ON users.id = currencies.user_id;

SELECT * FROM investments
JOIN currencies
ON investments.id = currencies.investment_id;

SELECT * FROM users
JOIN investments
ON users.id = investments.user_id;
