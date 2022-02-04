import { ValidationPipe } from '@nestjs/common';

const validationPipe = () => {
  return new ValidationPipe({
    transform: true,
    forbidUnknownValues: true,
  });
};

export default validationPipe;
