import mongoose, { connect, model, Types } from 'mongoose';
import { WeaponSchema } from '../weapons/schemas/weapon.schema';

async function main() {
  await connect('mongodb://localhost:27017/tlou'); // tu string de conexión
  // TODO: actualizar armas restates una vez que sus personajes esten cargados
  const Weapon = model('Weapon', WeaponSchema);

  const ellieCharacterId = new Types.ObjectId('6827fba8a131b61e133b6b94');
  const abbyCharacterId = new Types.ObjectId('683e58f63b28607f380c8562');

  const idsEllie = [
    new mongoose.Types.ObjectId('6827fc6ba131b61e133b6b96'),
    new mongoose.Types.ObjectId('6827fde9a131b61e133b6b9e'),
    new mongoose.Types.ObjectId('6827fdf9a131b61e133b6ba2'),
    new mongoose.Types.ObjectId('6827fe0ca131b61e133b6ba6'),
    new mongoose.Types.ObjectId('6827fe23a131b61e133b6bac'),
  ];
  const idsAbby = [
    new mongoose.Types.ObjectId('6827fdc8a131b61e133b6b98'),
    new mongoose.Types.ObjectId('6827fde9a131b61e133b6b9e'),
    new mongoose.Types.ObjectId('6827fdf1a131b61e133b6ba0'),
    new mongoose.Types.ObjectId('6827fe05a131b61e133b6ba4'),
    new mongoose.Types.ObjectId('6827fe1ba131b61e133b6baa'),
  ];
  // Actualizamos trading_card
  const resultTrading = await Weapon.updateMany(
    { _id: { $in: idsEllie } },
    {
      $set: { character: [{ _id: ellieCharacterId, name: 'Ellie Williams' }] },
    },
  );

  console.log(
    `✅ Updated ${resultTrading.modifiedCount} trading_card collectibles with character ${ellieCharacterId}`,
  );

  // Actualizamos coin
  const resultCoin = await Weapon.updateMany(
    { _id: { $in: idsAbby } },
    { $set: { character: [{ _id: abbyCharacterId, name: 'Abby Anderson' }] } },
  );

  console.log(
    `✅ Updated ${resultCoin.modifiedCount} coin collectibles with character ${abbyCharacterId}`,
  );

  console.log('🎉 Migration done!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
