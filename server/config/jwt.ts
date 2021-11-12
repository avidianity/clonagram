import Env from '@ioc:Adonis/Core/Env';

const jwtConfig = {
	key: Env.get('JWT_KEY', 'secret'),
};

export default jwtConfig;
