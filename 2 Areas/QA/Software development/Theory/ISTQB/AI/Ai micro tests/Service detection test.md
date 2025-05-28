In order to avoid misconceptions at interpreting user prompt
As a llm dev
I wish to have a set of example prompts

Given a few categories of services related requests:
  - swap
  - blockchain analytics
  - dashboard analytics
  - app related questions
  - price notifications quest
Given a problem to differentiate the message subject
Given a requirement to map message to a subject
Given a possible solution as a weighted evaluation
of probability to fall into one of provided groups
Given a risk to fall into a wrong group
Given a restriction for similar weights
Given a restriction that user request can ve mapped only to single category
Given <ontology>
Given <exampleUserQueries>
Given <exampleInputToOutputMappings>
Then expect to see query to service map in a table form for all 40 queries
Then expect in a mapped service column the name of the service only

  e.g. _is_(swap,service) stays for "swap is service"  

<ontology> 

	Core Concepts
	
	Services
		_is_(swap, service)
		_is_(blockchainAnalytics, Q&AService)
		_is_(dashboardAnalytics, descriptionService)
		_is_(priceNotificationsQuest, service)
		_is_(walletManagement, service)
		_is_(tradeExecution, service)
		_is_(liquidityProvision, service)
		_is_(identityVerification, service)
	
	Service Dependencies
		_requires_asParams(swap, [tokenFromName, tokenFromAmount, tokenToAmount, tokenToName])
		_requires_asParams(tradeExecution, [tokenPair, orderType, orderSize])
		_requires_asParams(walletManagement, [walletAddress, accessKey])
		_requires_asParams(liquidityProvision, [poolID, tokenA, tokenB, amountA, amountB])
		_requires_asParams(identityVerification, [userID, documentType, verificationMethod])
	
	Data Flow
		_uses_from_(blockchainAnalytics, data, Internet)
		_uses_from_(blockchainAnalytics, data, ourDatabase)
		_describes_thatShowsOur_(dashboardAnalytics, dashboards, warehouseData)
		_is_(warehouseData, SQLQueriesBased)
		_stores_in_(walletManagement, database, userCredentials)
		_logs_in_(tradeExecution, database, orderHistory)
	
	Triggering Events
		_triggers_that_(swap, service, swaps)
		_triggers_thatSends_(priceNotificationsQuest, service, priceNotifications)
		_triggers_thatUpdates_(walletManagement, user, balance)
		_triggers_thatCreates_(liquidityProvision, pool, newLiquidityEvent)
		_triggers_thatNotifies_(tradeExecution, user, orderStatus)
	
	User Interaction & Documentation
		_takesAnswersFromOur_(appRelatedQuestions, docs)
		_includesQuestion_(appRelatedQuestions, "How")
		_provides_(identityVerification, user, accessPrivileges)
	
	Error Handling & Risk
		_hasRiskOf_(swap, slippage)
		_hasRiskOf_(tradeExecution, frontRunning)
		_hasRiskOf_(walletManagement, privateKeyExposure)
		_hasRiskOf_(liquidityProvision, impermanentLoss)

</ontology> 
   
<exampleUserQueries> 
	1 "Swap 1 ETH to USDC"
	2 "What is the daily transaction volume on Ethereum?"
	3 "How can I display daily swap activity in my dashboard?"
	4 "Where can I find the API documentation for your service?"
	5 "Notify me when BTC price goes above $60K"
	6 "Swap 500 USDC to DAI"
	7 "How many unique addresses interacted with Uniswap today?"
	8 "Show me a chart of token swaps over the last month"
	9 "How do I configure API keys in your app?"
	10 "Send an alert when ETH price drops by 5%"
	11 "Execute a swap from WBTC to ETH"
	12 "What's the average gas fee for Ethereum transactions?"
	13 "Can I get a breakdown of liquidity pool changes in my dashboard?"
	14 "How do I enable two-factor authentication?"
	15 "Notify me when the gas price is below 20 Gwei"
	16 "What is the highest trading volume pair today?"
	17 "Show a heatmap of active trading pairs on my dashboard"
	18 "How do I reset my password?"
	19 "Convert 50 DAI to USDT at the best rate"
	20 "Alert me when Uniswap's total volume exceeds $1B"
	 21 "Swap 100 USDC to ETH"
	 22 "What is the daily transaction volume on Ethereum?"
	 23 "Show daily swap activity in my dashboard"
	 24 "Where can I find the API documentation?"
	 25 "Notify me when BTC price goes above $60K"
	 26 "Swap 500 USDT to DAI"
	 27 "How many unique addresses interacted with Uniswap today?"
	 28 "Generate a bar chart of token swaps over the last week"
	 29 "How do I configure API keys in your app?"
	 30 "Send an alert when ETH price drops by 5%"
	 31 "Execute a swap from WBTC to ETH"
	 32 "What’s the average gas fee for Ethereum transactions?"
	 33 "Can I get a breakdown of liquidity pool changes in my dashboard?"
	 34 "How do I enable two-factor authentication?"
	 35 "Notify me when gas price is below 20 Gwei"
	 36 "What is the highest trading volume pair today?"
	 37 "Show a heatmap of active trading pairs on my dashboard"
	 38 "How do I reset my password?"
	 39 "Convert 50 DAI to USDT at the best rate"
	 40 "Alert me when Uniswap’s total volume exceeds $1B"
 </exampleUserQueries> 
		
<exampleInputToOutputMappings> 
	 input: "Swap 1 ETH to USDC" output: swap
	 input: "What is the daily transaction volume on Ethereum?", output: blockchainAnalytics
	 input: "How can I display daily swap activity in my dashboard?" output: dashboardAnalytics
</exampleInputToOutputMappings> 

---

Valid outputs:
1 "Swap 1 ETH to USDC" - swap
2 "What is the daily transaction volume on Ethereum?" - blockchainAnalytics
3 "How can I display daily swap activity in my dashboard?" - dashboardAnalytics
4 "Where can I find the API documentation for your service?" - appRelatedQuestions
5 "Notify me when BTC price goes above $60K" - priceNotificationsQuest
6 "Swap 500 USDC to DAI" - swap
7 "How many unique addresses interacted with Uniswap today?" - blockchainAnalytics
8 "Show me a chart of token swaps over the last month" - dashboardAnalytics
9 "How do I configure API keys in your app?" - appRelatedQuestions
10 "Send an alert when ETH price drops by 5%" - priceNotificationsQuest
11 "Execute a swap from WBTC to ETH" - swap
12 "What's the average gas fee for Ethereum transactions?" - blockchainAnalytics
13 "Can I get a breakdown of liquidity pool changes in my dashboard?" - dashboardAnalytics
14 "How do I enable two-factor authentication?" - appRelatedQuestions
15 "Notify me when the gas price is below 20 Gwei" - priceNotificationsQuest
16 "What is the highest trading volume pair today?" -  blockchainAnalytics
17 "Show a heatmap of active trading pairs on my dashboard" - dashboardAnalytics
18 "How do I reset my password?" - appRelatedQuestions
19 "Convert 50 DAI to USDT at the best rate" - swap
20 "Alert me when Uniswap's total volume exceeds $1B" - priceNotificationsQuest
21 "Swap 100 USDC to ETH" - swap
22 "What is the daily transaction volume on Ethereum?" - blockchainAnalytics
23 "Show daily swap activity in my dashboard" - dashboardAnalytics
24 "Where can I find the API documentation?" - appRelatedQuestions
25 "Notify me when BTC price goes above $60K" - priceNotificationsQuest
26 "Swap 500 USDT to DAI" - swap
27 "How many unique addresses interacted with Uniswap today?" - blockchainAnalytics
28 "Generate a bar chart of token swaps over the last week" - dashboardAnalytics
29 "How do I configure API keys in your app?" - appRelatedQuestions
30 "Send an alert when ETH price drops by 5%" - priceNotificationsQuest
31 "Execute a swap from WBTC to ETH" - swap
32 "What’s the average gas fee for Ethereum transactions?" - blockchainAnalytics
33 "Can I get a breakdown of liquidity pool changes in my dashboard?" - dashboardAnalytics
34 "How do I enable two-factor authentication?" - appRelatedQuestions
35 "Notify me when gas price is below 20 Gwei" - priceNotificationsQuest
36 "What is the highest trading volume pair today?" - blockchainAnalytics
37 "Show a heatmap of active trading pairs on my dashboard" - dashboardAnalytics
38 "How do I reset my password?" - appRelatedQuestions
39 "Convert 50 DAI to USDT at the best rate" - swap
40 "Alert me when Uniswap’s total volume exceeds $1B" - priceNotificationsQuest
		 
  
