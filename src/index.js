const express = require("express");
const {v4 : uuidv4} = require("uuid");
const PORT = 3030;
const app = express();
const customers = [];

app.use(express.json());

function verifyExistsAccountByCPF (request, response, next) {
    
    const { cpf } = request.headers;
    
    const customer = customers.find((customer) => customer.cpf === cpf);
    
    if(!customer){
    
        return response.status(400).json({error: "CPF Não encontrado."});
    }
    
    request.customer = customer;

    return next();

}

function getBalance (statement) {

    const balance = statement.reduce( (acc, op) => {
        if(op.type === "credit") {
            return acc + op.amount;
        }
        else{
            return acc - op.amount;
        }
       
    }, 0);
    return balance;
}

app.post("/account", (request, response) => {

    const { cpf , name } = request.body;

    const verExists = customers.some( (customers) => customers.cpf === cpf );

    if(verExists){

        return response.status(400).json({error: "CPF Já existente."});  

    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement : []
    });

    return response.status(201).send();
    
});

app.get("/statement", verifyExistsAccountByCPF, (request, response) => {
    
    const { customer } = request;

    return response.json(customer.statement);
   
});

app.post("/deposit", verifyExistsAccountByCPF, (request, response) => {

        const { description, amount } = request.body;
        const { customer } = request;

        const statementOp = {
            description,
            amount,
            createAt: new Date(),
            type: "credit"
        }

        customer.statement.push(statementOp);
        
        return response.status(201).send();
});

app.post("/withdraw", verifyExistsAccountByCPF, (request, response) => {

    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if(balance < amount){
        return response.status(400).json({error: "Insufficient Funds"});
    }

    const statementOp = {
        amount,
        createAt: new Date(),
        type: "debit"
    }
    customer.statement.push(statementOp);
    
    return response.status(201).send();

});

app.get("/statement/date", verifyExistsAccountByCPF, (request, response) => {
    
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => statement.createAt.toDateString() === new Date (dateFormat).toDateString());
   
    return response.json(statement);
   
});

app.put("/account", verifyExistsAccountByCPF, (request, response) => {

    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

app.get("/account", verifyExistsAccountByCPF, (request, response) =>{
    
    const { customer } = request;

    return response.json(customer);
});

app.delete("/account", verifyExistsAccountByCPF, (request, response) => {
    
    const { customer } = request;
    
    customers.splice(customer, 1);

    return response.status(200).json(customers);
});

app.get("/balance", verifyExistsAccountByCPF, (request, response) => {
    const { customer } = request;
    const balance = getBalance(customer.statement);

    return response.json(balance);
})
app.listen(PORT);