export const tnxPrompt = `Analyze this Ethereum transaction and create a concise summary.
Focus on:
- From/To addresses with context clues
- ETH/USD value + direction
- Gas fees (USD + ETH)
- Status + confirmation time
- Contract interactions/NFTs
- Anomalies (failed tx, flashbots, etc)

Format:
1. Start with 🔄 for normal tx or ⚡ for contract interaction
2. summary with key metrics
3. Add "ℹ️ Pro Tip:" if gas > $50 or failed tx`;

export const blockPrompt = `Summarize this Ethereum block data clearly.
Focus on:
- Block number/age
- Miner/validator
- Transactions count
- Gas used/limits
- Rewards (base + uncle)
- MEV activities

Format:
1. Start with ⛏️ emoji
2. Include size metrics and miner stats
3. Add "ℹ️ Pro Tip:" if empty block or >$10k rewards
`;

export const addressPrompt = `Explain this Ethereum address simply.
Focus on:
- ETH balance (USD value)
- Transaction count
- Contract creator status
- Token portfolio summary
- Recent activity patterns
- Verified labels

Format:
1. Start with 📨 for EOA or 📑 for contract
2. Highlight assets and activity level
3. Add "ℹ️ Pro Tip:" if inactive >1yr or holds NFTs
`;

export const tokenPrompt = `Break down this token/NFT information.
Focus on:
- Token type (ERC-20/721/1155)
- Market data (price/MCAP)
- Supply dynamics
- Holder distribution
- Contract verification
- Notable transfers

Format:
1. Start with 🪙 for fungible or 🖼️ for NFT
2. Include liquidity/rarity metrics
3. Add "ℹ️ Pro Tip:" if unverified contract or <100 holders
`;
