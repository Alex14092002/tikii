import express from 'express';
import agentController from '../controllers/agent.controller';
import { VerifyTokenAgent } from '../middleware';

const router = express.Router();

const agentRoute = (app) => {
    router.post('/auth/login', agentController.Login);
    router.post('/event/create', VerifyTokenAgent, agentController.CreateEvent);
    router.get('/event/list', VerifyTokenAgent, agentController.ListEventOfAgent);
    router.get('/status', VerifyTokenAgent, agentController.Status);
    router.post('/auth/register-customer', agentController.AgentCreateCustomerAccount);
    router.get('/users/list', VerifyTokenAgent, agentController.ListUserOfAgent);

    // router.get('/users/list', VerifyTokenAgent, agentController.ListUserOfAgent);
    router.put('/agent/ConfirmRecharge', VerifyTokenAgent, agentController.agentConfirmRecharge);
    router.get('/agent/GetRecharge', VerifyTokenAgent, agentController.agentGetRecharge);

    router.put('/agent/ConfirmWithdraw', VerifyTokenAgent, agentController.agentConfirmWithdraw);
    router.get('/agent/GetWithdraw', VerifyTokenAgent, agentController.agentGetWithdraw);

    router.delete('/empty-cart/:customer_id', VerifyTokenAgent, agentController.buyHistoryDelete);

    router.get('/Transaction/TotalNotify', VerifyTokenAgent, agentController.GetTotalTransactionNotify);
    router.get('/GetUserInfo', VerifyTokenAgent, agentController.GetUserInfo);

    return app.use('/api/v1/agent', router);
};

export default agentRoute;