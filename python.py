print("hello world")

class Character:
	def __init__(self , name , health , attack):
		self.name = name
		self.health = health
		self.attack = attack
	def attack_enemy(self , enemy):
		attack_enemy = f"{self.name} attack {enemy.name} with damage {self.attack}"
		print(f"{self.name} vient de attacker {enemy.name}")
		enemy.get_hit(self.attack)
		return attack_enemy
	def get_hit(self , degat):
		self.health = self.health - degat
		if self.health == 0:
			print(f"{self.name} is dead")
	
	def heal(self , ammount):
		healing_health = self.health + ammount
		self.health = healing_health
		result = f"{self.name} just heal himself and is health is now {self.health}"
		return result , healing_health

player = Character("Ricci" , 100 , 80)
enemy = Character("Bob" , 80  , 10)

print(player.attack_enemy(enemy))
