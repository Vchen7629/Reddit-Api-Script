import { TokenResponse } from "./types";

const USER_AGENT = 'post-comment-script/1.0 by /u/ZephyrusDragon';

class GetAccessToken {
    private accessToken: string | null;

    constructor() {
        this.accessToken = null;
    }

    async getToken(): Promise<TokenResponse | null> {
        try {
            const credentials = Buffer.from(
                `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
            ).toString('base64');


            const formData = new URLSearchParams({
                'grant_type': 'client_credentials',
                'scope': 'read'
            }).toString();
    
            const response = await fetch("https://www.reddit.com/api/v1/access_token", {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': USER_AGENT
                },
                body: formData
            })
            
            const responseText = await response.text();
            
            if (!response.ok) {
                throw new Error(`Auth failed with status: ${response.status}`);
            }
    
            const data = JSON.parse(responseText) as TokenResponse;
            console.log('Parsed response data:', data);
            this.accessToken = data.access_token;
            console.log('New access token obtained');
            return data;
        } catch (err) {
            console.error("Error getting access token", err);
            return null
        }
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }
}

module.exports = new GetAccessToken();