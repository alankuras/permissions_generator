from abc import ABC, abstractmethod
from enum import Enum


class Permission(Enum):
    CREATE = 1
    READ = 2
    UPDATE = 3
    DELETE = 4


class ModuleABC(ABC):
    @property
    @abstractmethod
    def decimal(self):
        pass

    @property
    @abstractmethod
    def permission(self):
        pass


class Module(ModuleABC):
    def __init__(self, permission: Permission, decimal) -> None:
        self._decimal = decimal
        self._permission = permission

    def __lt__(self, other: ModuleABC):
        return self._decimal <= other.decimal

    def __eq__(self, other: Enum):
        return self._permission == other

    def __repr__(self):
        return f"<{self.__class__.__name__} permission: {self.permission.name}>"

    @property
    def decimal(self) -> int:
        return self._decimal

    @property
    def permission(self) -> Enum:
        return self._permission


class Module1(Module):
    pass


class Module2(Module):
    pass


class Module3(Module):
    pass


class Module4(Module):
    pass


permission_list = [
    Module1(permission=Permission.CREATE, decimal=pow(2, 0)),
    Module1(permission=Permission.READ, decimal=pow(2, 1)),
    Module1(permission=Permission.UPDATE, decimal=pow(2, 2)),
    Module1(permission=Permission.DELETE, decimal=pow(2, 3)),
    Module2(permission=Permission.CREATE, decimal=pow(2, 4)),
    Module2(permission=Permission.READ, decimal=pow(2, 5)),
    Module2(permission=Permission.UPDATE, decimal=pow(2, 6)),
    Module2(permission=Permission.DELETE, decimal=pow(2, 7)),
    Module3(permission=Permission.CREATE, decimal=pow(2, 8)),
    Module3(permission=Permission.READ, decimal=pow(2, 9)),
    Module3(permission=Permission.UPDATE, decimal=pow(2, 10)),
    Module3(permission=Permission.DELETE, decimal=pow(2, 11)),
    Module4(permission=Permission.CREATE, decimal=pow(2, 12)),
    Module4(permission=Permission.READ, decimal=pow(2, 13)),
    Module4(permission=Permission.UPDATE, decimal=pow(2, 14)),
    Module4(permission=Permission.DELETE, decimal=pow(2, 15)),
]


def compute_permissions(decimal_value: int):
    permission_list.sort(reverse=True)
    computed_permission_list = []

    while decimal_value > 0:
        for permission in permission_list:
            if permission.decimal <= decimal_value:
                computed_permission_list.append(permission)
                decimal_value -= permission.decimal

    return computed_permission_list


if __name__ == '__main__':
    print(compute_permissions(decimal_value=33345))
    print(
        Permission.CREATE in [x for x in compute_permissions(decimal_value=33345) if type(x) == Module1]

    )

    print(
        Permission.CREATE in [x for x in compute_permissions(decimal_value=33345) if type(x) == Module2]
    )

